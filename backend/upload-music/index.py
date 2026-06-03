import os
import boto3
import urllib.request

def handler(event: dict, context) -> dict:
    """Скачивает романтический трек и загружает в S3 проекта"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    url = 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Fr-Chopin-piano.ogg'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25) as r:
        data = r.read()

    s3.put_object(
        Bucket='files',
        Key='music/romantic.ogg',
        Body=data,
        ContentType='audio/ogg',
        ACL='public-read'
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/music/romantic.ogg"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': f'{{"url": "{cdn_url}"}}'
    }