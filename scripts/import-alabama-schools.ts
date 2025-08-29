import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import { parse } from 'csv-parse/sync'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function main() {
  const file = path.resolve(process.cwd(), 'data', 'alabama_schools.csv')
  const csv = fs.readFileSync(file, 'utf8')
  const rows = parse(csv, { columns: true, skip_empty_lines: true })
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

  for (const row of rows) {
    const rec = {
      name: row.name?.trim(),
      state: 'AL',
      city: row.city?.trim() || null,
      county: row.county?.trim() || null,
      classification: row.classification?.trim() || null,
      status: 'active',
      source: 'csv-import',
    }
    if (!rec.name) continue
    await supabase.from('schools').insert(rec)
  }
  console.log('AL schools import complete')
}
main().catch(console.error)
