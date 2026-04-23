import { Test } from '../interfaces/Test';

interface HistoricalScoreTableProps {
  tests: Test[];
}

const formatDate = (dateValue: string): string => {
  try {
    if (!dateValue) return '-';
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return dateValue;
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateValue;
  }
};

export const HistoricalScoreTable = ({ tests }: HistoricalScoreTableProps) => {
  return (
    <div className="relative overflow-x-auto rounded-md bg-sprint-config">
      <table className="w-full text-sm text-left rtl:text-right text-sprint-foreground">
        <thead className="text-xs text-sprint-muted">
          <tr>
            <th scope="col" className="px-6 py-3">
              Wpm
            </th>
            <th scope="col" className="px-6 py-3">
              Raw
            </th>
            <th scope="col" className="px-6 py-3">
              precision
            </th>
            <th scope="col" className="px-6 py-3">
              characters
            </th>
            <th scope="col" className="px-6 py-3">
              Mode
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr className="odd:bg-sprint-home/70 text-lg" key={test.uid}>
              <td
                scope="row"
                className="px-6 py-1 md:py-4 font-medium   whitespace-nowrap"
              >
                {test.wpm}
              </td>
              <td className="px-6 py-1 md:py-4">{test.raw}</td>
              <td className="px-6 py-1 md:py-4">{test.precision} %</td>
              <td className="px-6 py-1 md:py-4">{test.characters}</td>
              <td className="px-6 py-1 md:py-4">{test.modeSelected}</td>
              <td className="px-6 py-1 md:py-4 ">{formatDate(test.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
