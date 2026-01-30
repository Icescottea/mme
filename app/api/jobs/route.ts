import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Fetch all jobs
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    let sql = 'SELECT * FROM jobs WHERE 1=1';
    const params: any[] = [];
    let paramCount = 0;

    if (category && category !== 'all') {
      paramCount++;
      sql += ` AND category = $${paramCount}`;
      params.push(category);
    }

    if (status) {
      paramCount++;
      sql += ` AND status = $${paramCount}`;
      params.push(status);
    }

    sql += ' ORDER BY created_at DESC';

    const result = await query(sql, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

// POST - Create new job (Admin only)
export async function POST(request: Request) {
  try {
    // In production, verify JWT token here
    const body = await request.json();
    const { title, category, location, salary_range, contact, description, requirements, status } = body;

    // Validation
    if (!title || !category || !location || !description || !contact) {
      return NextResponse.json(
        { error: 'Title, category, location, contact, and description are required' },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO jobs (title, category, location, salary_range, contact, description, requirements, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const result = await query(sql, [
      title,
      category,
      location,
      salary_range || null,
      contact,
      description,
      requirements || null,
      status || 'active',
    ]);

    return NextResponse.json(
      { 
        success: true, 
        job: result.rows[0],
        message: 'Job created successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}

// PUT - Update job (Admin only)
export async function PUT(request: Request) {
  try {
    // In production, verify JWT token here
    const body = await request.json();
    const { id, title, category, location, salary_range, contact, description, requirements, status } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const sql = `
      UPDATE jobs 
      SET 
        title = COALESCE($1, title),
        category = COALESCE($2, category),
        location = COALESCE($3, location),
        salary_range = COALESCE($4, salary_range),
        contact = COALESCE($5, contact),
        description = COALESCE($6, description),
        requirements = COALESCE($7, requirements),
        status = COALESCE($8, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *
    `;

    const result = await query(sql, [
      title,
      category,
      location,
      salary_range,
      contact,
      description,
      requirements,
      status,
      id,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      job: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

// DELETE - Delete job (Admin only)
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

    const sql = 'DELETE FROM jobs WHERE id = $1 RETURNING id';
    const result = await query(sql, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}