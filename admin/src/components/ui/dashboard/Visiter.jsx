import { Calendar, Users } from "lucide-react";

const Visiter = ({ data }) => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Daily Visitors */}
                <div className="p-6 bg-linear-to-r from-blue-50 to-blue-100 rounded-xl shadow flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-600">Today’s Visitors</h3>
                        <p className="text-2xl font-bold text-blue-700">{data.daily}</p>
                    </div>
                </div>

                {/* Total Visitors */}
                <div className="p-6 bg-linear-to-r from-green-50 to-green-100 rounded-xl shadow flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full mr-4">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-600">Total Visitors</h3>
                        <p className="text-2xl font-bold text-green-700">{data.total}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Visiter;