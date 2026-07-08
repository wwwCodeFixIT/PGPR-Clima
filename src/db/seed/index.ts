/**
 * PGPR Clima — Demo Seed
 * Run: pnpm db:seed
 */
import { db } from '../client'
import { organizations, profiles } from '../schema/organizations'
import { customers, sites } from '../schema/customers'
import { devices } from '../schema/devices'
import { workOrders } from '../schema/work-orders'
import { leads } from '../schema/leads'
import { cylinders } from '../schema/cylinders'
import { nanoid } from 'nanoid'

async function main() {
  console.log('🌱 Seeding PGPR Clima demo data...')

  // Organization
  const [org] = await db.insert(organizations).values({
    name:       'PGPR Instalacje Sp. z o.o.',
    slug:       'pgpr-instalacje',
    nip:        '1234567890',
    email:      'biuro@pgpr-instalacje.pl',
    phone:      '+48 71 000 00 00',
    address:    'ul. Klimatyczna 14',
    city:       'Wrocław',
    postalCode: '50-001',
    plan:       'pro',
  }).returning()

  console.log('✅ Organization:', org?.name)

  // Customers
  const customersData = [
    { type: 'individual', firstName: 'Jan', lastName: 'Kowalski', email: 'jan@example.com', phone: '+48 601 000 001', city: 'Wrocław' },
    { type: 'company', companyName: 'Restauracja Pod Lipami', nip: '9876543210', email: 'kontakt@podlipami.pl', phone: '+48 71 111 11 11', city: 'Wrocław' },
    { type: 'company', companyName: 'Wspólnota Mieszkaniowa Różana', email: 'rozana@wm.pl', phone: '+48 71 222 22 22', city: 'Wrocław' },
    { type: 'company', companyName: 'Biuro Rachunkowe ExAct', nip: '1111111111', email: 'biuro@exact.pl', phone: '+48 71 333 33 33', city: 'Wrocław' },
  ]

  for (let i = 0; i < customersData.length; i++) {
    const c = customersData[i]!
    await db.insert(customers).values({
      ...c,
      organizationId: org!.id,
      number: `KL/${String(i + 1).padStart(5, '0')}`,
    })
  }

  console.log('✅ Customers seeded:', customersData.length)

  // Cylinders
  const cylindersData = [
    { number: 'BU/001', refrigerantType: 'R32',   taraKg: 8.5, capacityKg: 15, currentGrossKg: 21.2, status: 'active' },
    { number: 'BU/002', refrigerantType: 'R410A', taraKg: 9.0, capacityKg: 25, currentGrossKg: 18.3, status: 'low' },
    { number: 'BU/003', refrigerantType: 'R32',   taraKg: 8.5, capacityKg: 15, currentGrossKg: 23.5, status: 'active' },
    { number: 'BU/004', refrigerantType: 'R134a', taraKg: 7.0, capacityKg: 30, currentGrossKg: 37.0, status: 'active' },
  ]
  for (const cyl of cylindersData) {
    await db.insert(cylinders).values({ ...cyl, organizationId: org!.id })
  }
  console.log('✅ Cylinders seeded:', cylindersData.length)

  console.log('\n🎉 Demo seed complete!')
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
