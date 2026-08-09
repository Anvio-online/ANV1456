/**
 * content-layer.md §2 whitelist. A styled two-column comparison for
 * "X vs Y" guides — plain GFM markdown tables (remark-gfm is enabled
 * on every MDX body) already cover generic tabular data; this exists
 * for the specific comparison shape guides like n8n-vs-zapier need,
 * with a visual treatment closer to why-us:contrast-table. Emits a
 * real <table> either way — seo-strategy.md §7.6, extractors parse
 * structure, not styled divs.
 */
export function Comparison({
  columns,
  rows,
}: {
  /** e.g. ["n8n", "Zapier"] */
  columns: [string, string]
  /** e.g. [["Self-hosted", "Yes", "No"], ...] — [label, left, right] */
  rows: [string, string, string][]
}) {
  return (
    <table className="text-body-s my-8 w-full border-collapse">
      <thead>
        <tr>
          <th className="border-border-soft border-b pb-3 text-left font-normal" />
          <th className="border-border-soft text-label text-text-3 border-b pb-3 pl-4 text-left font-mono uppercase tracking-widest">
            {columns[0]}
          </th>
          <th className="border-border-soft text-label text-text-3 border-b pb-3 pl-4 text-left font-mono uppercase tracking-widest">
            {columns[1]}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([label, left, right]) => (
          <tr key={label} className="border-border-soft border-b">
            <td className="text-text py-3 font-medium">{label}</td>
            <td className="text-text-2 py-3 pl-4">{left}</td>
            <td className="text-text-2 py-3 pl-4">{right}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
