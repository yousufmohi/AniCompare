export function DataTable({ data, userOne, userTwo }) {
  const columns = [
    {
      header: "Title",
      accessor: "title",
      isLink: true, 
      getLink: (row) => `https://anilist.co/anime/${row.id}`,
    },
    {
      header: (
        <a
          href={`https://anilist.co/user/${userOne}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00B0FF] hover:underline"
        >
          {userOne}'s Score
        </a>
      ),
      accessor: "user_one_score",
    },
    {
      header: (
        <a
          href={`https://anilist.co/user/${userTwo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00B0FF] hover:underline"
        >
          {userTwo}'s Score
        </a>
      ),
      accessor: "user_two_score",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#272D3C] text-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-[#1E2530] text-[#00B0FF]">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-left font-semibold uppercase text-sm"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={
                idx % 2 === 0
                  ? "bg-[#272D3C]"
                  : "bg-[#1F2430] hover:bg-[#1E3A5F] transition-colors"
              }
            >
              {columns.map((col, cidx) => (
                <td key={cidx} className="px-6 py-3 text-sm">
                  {col.isLink ? (
                    <a
                      href={col.getLink(row)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00B0FF] hover:underline"
                    >
                      {row[col.accessor] ?? "-"}
                    </a>
                  ) : (
                    row[col.accessor] ?? "-"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
