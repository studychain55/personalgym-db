#!/usr/bin/env python3
"""Supabase テーブルセットアップ（REST API経由でSQL実行）"""
import os
import json
import requests

SUPABASE_URL = "https://tbtwegsiupiskevhgfjs.supabase.co"
SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidHdlZ3NpdXBpc2tldmhnZmpzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTQ1NzU0OSwiZXhwIjoyMDUxMDMzNTQ5fQ.tdxdjFOpP7IAgG_mjfrG_nxWsUFAEOPlafIULEWMcE0")

headers = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal",
}

def run():
    # Read SQL file
    sql_path = os.path.join(os.path.dirname(__file__), "../supabase/migrations/001_create_tables.sql")
    with open(sql_path, "r") as f:
        sql = f.read()

    # Split into individual statements and execute via REST
    # Since we can't run raw SQL via REST, we use the Python SDK
    from supabase import create_client
    sb = create_client(SUPABASE_URL, SERVICE_KEY)

    # Check if tables already exist by trying to query
    try:
        result = sb.table("Region").select("id").limit(1).execute()
        print(f"Region table exists: {len(result.data)} rows")
    except Exception as e:
        print(f"Region table doesn't exist yet: {e}")
        print("Please run the SQL migration manually via Supabase Dashboard SQL editor")
        print(f"SQL file: {os.path.abspath(sql_path)}")
        return

    # Insert regions if empty
    regions = sb.table("Region").select("id").execute()
    if not regions.data:
        print("Inserting regions...")
        region_data = [
            {"id": 1, "name": "北海道", "sort_order": 1},
            {"id": 2, "name": "東北", "sort_order": 2},
            {"id": 3, "name": "関東", "sort_order": 3},
            {"id": 4, "name": "中部", "sort_order": 4},
            {"id": 5, "name": "北陸", "sort_order": 5},
            {"id": 6, "name": "近畿", "sort_order": 6},
            {"id": 7, "name": "中国", "sort_order": 7},
            {"id": 8, "name": "四国", "sort_order": 8},
            {"id": 9, "name": "九州・沖縄", "sort_order": 9},
        ]
        sb.table("Region").upsert(region_data).execute()
        print(f"  Inserted {len(region_data)} regions")

    # Insert prefectures if empty
    prefs = sb.table("Prefecture").select("id").execute()
    if not prefs.data:
        print("Inserting prefectures...")
        pref_data = [
            {"id":1,"title":"北海道","slug":"hokkaido","region_id":1},
            {"id":2,"title":"青森県","slug":"aomori","region_id":2},
            {"id":3,"title":"岩手県","slug":"iwate","region_id":2},
            {"id":4,"title":"宮城県","slug":"miyagi","region_id":2},
            {"id":5,"title":"秋田県","slug":"akita","region_id":2},
            {"id":6,"title":"山形県","slug":"yamagata","region_id":2},
            {"id":7,"title":"福島県","slug":"fukushima","region_id":2},
            {"id":8,"title":"茨城県","slug":"ibaraki","region_id":3},
            {"id":9,"title":"栃木県","slug":"tochigi","region_id":3},
            {"id":10,"title":"群馬県","slug":"gunma","region_id":3},
            {"id":11,"title":"埼玉県","slug":"saitama","region_id":3},
            {"id":12,"title":"千葉県","slug":"chiba","region_id":3},
            {"id":13,"title":"東京都","slug":"tokyo","region_id":3},
            {"id":14,"title":"神奈川県","slug":"kanagawa","region_id":3},
            {"id":15,"title":"新潟県","slug":"niigata","region_id":4},
            {"id":16,"title":"富山県","slug":"toyama","region_id":5},
            {"id":17,"title":"石川県","slug":"ishikawa","region_id":5},
            {"id":18,"title":"福井県","slug":"fukui","region_id":5},
            {"id":19,"title":"山梨県","slug":"yamanashi","region_id":4},
            {"id":20,"title":"長野県","slug":"nagano","region_id":4},
            {"id":21,"title":"岐阜県","slug":"gifu","region_id":4},
            {"id":22,"title":"静岡県","slug":"shizuoka","region_id":4},
            {"id":23,"title":"愛知県","slug":"aichi","region_id":4},
            {"id":24,"title":"三重県","slug":"mie","region_id":6},
            {"id":25,"title":"滋賀県","slug":"shiga","region_id":6},
            {"id":26,"title":"京都府","slug":"kyoto","region_id":6},
            {"id":27,"title":"大阪府","slug":"osaka","region_id":6},
            {"id":28,"title":"兵庫県","slug":"hyogo","region_id":6},
            {"id":29,"title":"奈良県","slug":"nara","region_id":6},
            {"id":30,"title":"和歌山県","slug":"wakayama","region_id":6},
            {"id":31,"title":"鳥取県","slug":"tottori","region_id":7},
            {"id":32,"title":"島根県","slug":"shimane","region_id":7},
            {"id":33,"title":"岡山県","slug":"okayama","region_id":7},
            {"id":34,"title":"広島県","slug":"hiroshima","region_id":7},
            {"id":35,"title":"山口県","slug":"yamaguchi","region_id":7},
            {"id":36,"title":"徳島県","slug":"tokushima","region_id":8},
            {"id":37,"title":"香川県","slug":"kagawa","region_id":8},
            {"id":38,"title":"愛媛県","slug":"ehime","region_id":8},
            {"id":39,"title":"高知県","slug":"kochi","region_id":8},
            {"id":40,"title":"福岡県","slug":"fukuoka","region_id":9},
            {"id":41,"title":"佐賀県","slug":"saga","region_id":9},
            {"id":42,"title":"長崎県","slug":"nagasaki","region_id":9},
            {"id":43,"title":"熊本県","slug":"kumamoto","region_id":9},
            {"id":44,"title":"大分県","slug":"oita","region_id":9},
            {"id":45,"title":"宮崎県","slug":"miyazaki","region_id":9},
            {"id":46,"title":"鹿児島県","slug":"kagoshima","region_id":9},
            {"id":47,"title":"沖縄県","slug":"okinawa","region_id":9},
        ]
        sb.table("Prefecture").upsert(pref_data).execute()
        print(f"  Inserted {len(pref_data)} prefectures")

    print("\n✅ DB setup complete!")
    # Verify
    gyms = sb.table("Gym").select("id", count="exact").execute()
    print(f"  Gym count: {gyms.count}")
    prefs = sb.table("Prefecture").select("id", count="exact").execute()
    print(f"  Prefecture count: {prefs.count}")

if __name__ == "__main__":
    run()
