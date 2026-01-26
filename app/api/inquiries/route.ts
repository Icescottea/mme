import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Fetch all inquiries (Admin only)
export async function GET(request: Request) {
  try {
    // In production, verify JWT token here
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let sql = `
      SELECT 
        i.*,
        j.title as job_title
      FROM inquiries i
      LEFT JOIN jobs j ON i.job_id = j.id
      ORDER BY i.created_at DESC
    `;

    if (status && status !== 'all') {
      sql = `
        SELECT 
          i.*,
          j.title as job_title
        FROM inquiries i
        LEFT JOIN jobs j ON i.job_id = j.id
        WHERE i.status = $1
        ORDER BY i.created_at DESC
      `;
      const result = await query(sql, [status]);
      return NextResponse.json(result.rows);
    }

    const result = await query(sql);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

// POST - Create new inquiry (Public)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, jobId, message } = body;

    // Validation
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Full name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO inquiries (full_name, email, phone, job_id, message, status)
      VALUES ($1, $2, $3, $4, $5, 'new')
      RETURNING *
    `;

    const result = await query(sql, [
      fullName,
      email,
      phone || null,
      jobId || null,
      message,
    ]);

    return NextResponse.json(
      { 
        success: true, 
        inquiry: result.rows[0],
        message: 'Inquiry submitted successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}

// PUT - Update inquiry status (Admin only)
export async function PUT(request: Request) {
  try {
    // In production, verify JWT token here
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['new', 'contacted', 'closed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const sql = `
      UPDATE inquiries 
      SET status = $1
      WHERE id = $2
      RETURNING *
    `;

    const result = await query(sql, [status, id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      inquiry: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

// DELETE - Delete inquiry (Admin only)
export async function DELETE(request: Request) {
  try {
    // In production, verify JWT token here
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const sql = 'DELETE FROM inquiries WHERE id = $1 RETURNING id';
    const result = await query(sql, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}