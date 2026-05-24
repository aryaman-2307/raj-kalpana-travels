import { generatePageMetadata } from '@/lib/seo';
import { CAREERS } from '@/data/careers';
import Link from 'next/link';

export const metadata = generatePageMetadata('Careers', 'Join the Raj Kalpana Travels team. Explore open positions in operations, customer support, and marketing.', '/careers');

export default function CareersPage() {
  return (
    <section className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-gradient-to-br from-[#0F2B5B] to-[#1A3D7C] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F59E0B]">Careers</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold font-[family-name:var(--font-plus-jakarta-sans)]">Join Our Team</h1>
          <p className="mt-3 text-white/70 max-w-xl">Be part of a growing travel company that is transforming bus travel across India.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREERS.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:border-[#E53935]/30 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-[#1E293B] font-[family-name:var(--font-plus-jakarta-sans)]">{job.title}</h2>
                <span className="bg-[#E53935]/10 text-[#E53935] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">{job.type}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-[#64748B] mb-4">
                <span>📍 {job.location}</span>
                <span>🏢 {job.department}</span>
              </div>
              <p className="text-sm text-[#64748B] mb-4 line-clamp-3">{job.description}</p>
              <h3 className="text-sm font-semibold text-[#1E293B] mb-2">Requirements:</h3>
              <ul className="text-sm text-[#64748B] space-y-1 mb-6">
                {job.requirements.slice(0, 3).map((r, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>{r}</li>
                ))}
              </ul>
              <a href={`mailto:Info@rajkalpanatravels.com?subject=Application for ${job.title}`} className="inline-block px-6 py-2.5 bg-[#0F2B5B] text-white text-sm font-semibold rounded-full hover:bg-[#1A3D7C] transition-colors">Apply Now</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
