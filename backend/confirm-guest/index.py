import json
import os


def handler(event: dict, context) -> dict:
    """Сохраняет подтверждение гостя на свадьбу."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = (body.get("name") or "").strip()

    if not name:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "name required"})}

    import psycopg2
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute("INSERT INTO guests (name) VALUES (%s) RETURNING id", (name,))
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"ok": True, "id": row[0]}),
    }
