import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Receipt, Download, Calendar, DollarSign } from 'lucide-react';

const statusColors = {
  draft: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
  sent: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  overdue: 'bg-red-500/10 text-red-400 border-red-500/30',
  cancelled: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
};

export default function ProjectInvoices({ projectId }) {
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['project-invoices', projectId],
    queryFn: () => base44.entities.Invoice.filter({ project_id: projectId }, '-created_date'),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {invoices.length === 0 ? (
        <div className="text-center py-20">
          <Receipt className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No invoices yet</h3>
          <p className="text-gray-500">Invoices will appear here once issued.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10">
                    <Receipt className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">
                      Invoice #{invoice.invoice_number}
                    </h4>
                    <p className="text-gray-400 text-sm">{invoice.description}</p>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[invoice.status]}`}>
                  {invoice.status.toUpperCase()}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <DollarSign className="w-4 h-4" />
                    Amount
                  </div>
                  <div className="text-2xl font-bold text-white">
                    ${invoice.amount?.toLocaleString()} {invoice.currency}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    Issue Date
                  </div>
                  <div className="text-white font-semibold">
                    {invoice.issue_date ? new Date(invoice.issue_date).toLocaleDateString() : 'N/A'}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    Due Date
                  </div>
                  <div className="text-white font-semibold">
                    {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              </div>

              {invoice.items && invoice.items.length > 0 && (
                <div className="mb-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h5 className="text-sm font-semibold text-white mb-3">Line Items</h5>
                  <div className="space-y-2">
                    {invoice.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          {item.description} ({item.quantity} × ${item.rate})
                        </span>
                        <span className="text-white font-semibold">${item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {invoice.status === 'paid' && invoice.paid_date && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 mb-4">
                  <span className="text-emerald-400 text-sm">
                    Paid on {new Date(invoice.paid_date).toLocaleDateString()}
                  </span>
                </div>
              )}

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                {invoice.status === 'sent' && (
                  <button className="flex-1 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition-all">
                    Pay Now
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}