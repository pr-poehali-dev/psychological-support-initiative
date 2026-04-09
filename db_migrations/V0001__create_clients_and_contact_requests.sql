CREATE TABLE t_p1490319_psychological_suppor.clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p1490319_psychological_suppor.contact_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    status VARCHAR(50) DEFAULT 'new',
    client_id INTEGER REFERENCES t_p1490319_psychological_suppor.clients(id),
    created_at TIMESTAMP DEFAULT NOW()
);
