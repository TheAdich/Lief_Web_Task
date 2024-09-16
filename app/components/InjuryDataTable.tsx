import React, { useEffect, useState, useContext} from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

type InjuryDataTableProps = {
    id: string;
    name: string;
    reportDate: string;
    injuryDate: string;
    reportTime: string;
    injuryTime: string;
    status: string;
};

export const InjuryDataTable = () => {
    const context = useContext(AuthContext);
    const [injuryData, setInjuryData] = useState<InjuryDataTableProps[]>([]);
    const [filterOption, setFilterOption] = useState<string>('');
    const [nameFilter, setNameFilter] = useState<string>();
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    useEffect(() => {
        const getInjuryData = async () => {
            try {
                console.log(context?.authuser?.email);
                const result = await axios.post('https://lief-web-task.vercel.app/api/injurydata/getalldata', { email: context?.authuser?.email });
                if (result.data?.injuries) setInjuryData(result.data.injuries);
            } catch (error) {
                console.error("Error fetching injury data:", error);
            }
        };
        getInjuryData();
    }, []);
    

    const handleInjuryDelete = async (id: string) => {
        try {
            const res = await axios.post(`https://lief-web-task.vercel.app/api/injurydata/deletedata/`,{id:id,email:context?.authuser?.email});
            if (res.data?.injuries) setInjuryData(res.data.injuries);
        } catch (err) {
            console.log(err);
        }
    };

    const navigateToUpdate = (id: string) => {
        window.location.href = `/editInjuryItem/${id}`;
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterOption(e.target.value);
    };

    const handleNameFilterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value);

    };
    useEffect(() => {
        if (nameFilter) {
            applyFilters("name");
        }

    }, [nameFilter])

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const applyFilters = async (filterOption: string) => {
        console.log("Filters applied:", { filterOption, nameFilter, startDate, endDate });
        if (filterOption === "name") {
            try {
                const res = await axios.get(`https://lief-web-task.vercel.app/api/injurydata/getByName/${nameFilter}`);
                if (res.data?.injuries) setInjuryData(res.data.injuries);
            }
            catch (err) {
                console.log(err);
            }
        }
        else if (filterOption === "injuryDate" || filterOption === "reportDate") {
            console.log('api calling')
            try {
                const res = await axios.get(`https://lief-web-task.vercel.app/api/injurydata/getByDate?datetype=${filterOption}&startdate=${startDate}&enddate=${endDate}`);
                if (res.data?.injuries) setInjuryData(res.data.injuries);
            }
            catch (err) {
                console.log(err);
            }
        }
    };

    const resetFilters = async () => {
        setNameFilter('');
        setFilterOption('');
        setStartDate('');
        setEndDate('');
        try {
            const result = await axios.post('https://lief-web-task.vercel.app/api/injurydata/getalldata', { userid: context?.authuser?.email });
            if (result.data?.injuries) setInjuryData(result.data.injuries);
        } catch (error) {
            console.error("Error fetching injury data:", error);
        }
    }

    return (
        <>
            <div className="p-4">
                {/* Filter Section */}
                <div className="mb-4 flex items-center space-x-4">
                    <select
                        value={filterOption}
                        onChange={handleFilterChange}
                        className="text-black border border-gray-300 p-2 rounded-lg"
                    >
                        <option className="text-black" value="">Select Filter</option>
                        <option className="text-black" value="name">Name</option>
                        <option className="text-black" value="injuryDate">Incident Date</option>
                        <option className="text-black" value="reportDate">Reporting Date</option>
                    </select>

                    {filterOption === 'name' && (
                        <input
                            type="text"
                            value={nameFilter}
                            onChange={handleNameFilterChange}
                            placeholder="Search by Name"
                            className="border text-black border-gray-300 p-2 rounded-lg outline-none"
                        />
                    )}

                    {(filterOption === 'injuryDate' || filterOption === 'reportDate') && (
                        <>
                            <input

                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="border text-black border-gray-300 p-2 rounded-lg outline-none"
                                placeholder="Start Date"
                            />
                            <input
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                className="border text-black border-gray-300 p-2 rounded-lg outline-none"
                                placeholder="End Date"
                            />
                        </>
                    )}

                    <button
                        onClick={() => applyFilters(filterOption)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Apply Filters
                    </button>
                    <button
                        onClick={() => resetFilters()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Reset Filters
                    </button>
                </div>

                {/* Injury Data Table */}
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-black text-left">
                            <th className="py-3 px-6 font-semibold">Name</th>
                            <th className="py-3 px-6 font-semibold">Date of Injury</th>
                            <th className="py-3 px-6 font-semibold">Date of Report</th>
                            <th className="py-3 px-6 font-semibold">Status</th>
                            <th className="py-3 px-6 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {injuryData.length > 0 ? (
                            injuryData.map((item: InjuryDataTableProps, index: number) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="text-black py-3 px-6">{item.name}</td>
                                    <td className="text-black py-3 px-6">{item.injuryDate}</td>
                                    <td className="text-black py-3 px-6">{item.reportDate}</td>
                                    <td className="text-black py-3 px-6 text-sm">{item.status}</td>
                                    <td className="text-black py-3 px-6 flex space-x-4">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                                            onClick={() => navigateToUpdate(item.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                                            onClick={() => handleInjuryDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-slate-500 py-3 px-6 text-center" colSpan={5}>
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default InjuryDataTable;
