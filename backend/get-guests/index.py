import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Возвращает список гостей, подтвердивших присутствие на свадьбе."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    # Простая защита по ключу
    headers = event.get("headers") or {}
    admin_key = headers.get("X-Admin-Key") or headers.get("x-admin-key") or ""
    expected = os.environ.get("ADMIN_KEY", "")
    if expected and admin_key != expected:
        return {"statusCode": 403, "headers": cors, "body": json.dumps({"error": "forbidden"})}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute("SELECT id, name, confirmed_at FROM guests ORDER BY confirmed_at DESC")
    rows = cur.fetchall()
    cur.close()
    conn.close()

    guests = [
        {"id": r[0], "name": r[1], "confirmed_at": r[2].strftime("%d.%m.%Y %H:%M")}
        for r in rows
    ]

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"guests": guests, "total": len(guests)}, ensure_ascii=False),
    }
