export const HistoricalScoreTable = ({ history }) => {
    return (
        <div className="relative overflow-x-auto  rounded-md bg-sprint-config">
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Wpm
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Raw
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Presition
                        </th>
                        <th scope="col" className="px-6 py-3">
                            characteres
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
                    <tr className="odd:bg-sprint-home text-lg">
                        <th
                            scope="row"
                            className="px-6 py-1 md:py-4 font-medium   whitespace-nowrap"
                        >
                            58.63
                        </th>
                        <td className="px-6 py-1 md:py-4">58.63</td>
                        <td className="px-6 py-1 md:py-4">100 %</td>
                        <td className="px-6 py-1 md:py-4">47/1/0/0</td>
                        <td className="px-6 py-1 md:py-4">
                            time 15
                        </td>
                        <td className="px-6 py-1 md:py-4 ">
                            31/10/24
                            18:04
                        </td>
                    </tr>
                    <tr className="odd:bg-sprint-home text-lg">
                        <th
                            scope="row"
                            className="px-6 py-1 md:py-4 font-medium   whitespace-nowrap"
                        >
                            58.63
                        </th>
                        <td className="px-6 py-1 md:py-4">58.63</td>
                        <td className="px-6 py-1 md:py-4">100 %</td>
                        <td className="px-6 py-1 md:py-4">47/1/0/0</td>
                        <td className="px-6 py-1 md:py-4">
                            words 10
                        </td>
                        <td className="px-6 py-1 md:py-4 ">
                            31/10/24
                            18:04
                        </td>
                    </tr>

                </tbody>
            </table>
        </div >
    );
};
