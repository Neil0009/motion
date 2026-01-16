import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceBenefits from '@/components/services/ServiceBenefits';
import ServiceProcess from '@/components/services/ServiceProcess';
import ServiceProjects from '@/components/services/ServiceProjects';
import ServiceDeliverables from '@/components/services/ServiceDeliverables';

export default function ServiceDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceSlug = urlParams.get('service');

  const { data: service, isLoading: serviceLoading } = useQuery({
    queryKey: ['service', serviceSlug],
    queryFn: async () => {
      const services = await base44.entities.Service.list();
      return services.find(s => s.slug === serviceSlug);
    },
    enabled: !!serviceSlug,
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['service-projects', service?.title],
    queryFn: async () => {
      const allProjects = await base44.entities.Project.list();
      return allProjects.filter(p => 
        p.services && p.services.includes(service.title)
      );
    },
    enabled: !!service,
  });

  if (serviceLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Service not found</h2>
          <a href="/" className="text-cyan-400 hover:text-cyan-300">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ServiceHero service={service} />

      {service.benefits && service.benefits.length > 0 && (
        <ServiceBenefits benefits={service.benefits} />
      )}

      {service.process_steps && service.process_steps.length > 0 && (
        <ServiceProcess steps={service.process_steps} />
      )}

      {(service.deliverables || service.ideal_for) && (
        <ServiceDeliverables 
          deliverables={service.deliverables} 
          idealFor={service.ideal_for} 
        />
      )}

      {!projectsLoading && projects.length > 0 && (
        <ServiceProjects projects={projects} serviceName={service.title} />
      )}

      {/* CTA Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how {service.title.toLowerCase()} can bring your architectural vision to life.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold hover:from-cyan-400 hover:to-cyan-300 transition-all"
            >
              Request a Quote
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}