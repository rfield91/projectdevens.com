import { DateDisplayProps } from "../../common/types";

const DateDisplay = ({ startDate, endDate }: DateDisplayProps) => {
    if (endDate?.toString() == "Invalid Date" || endDate === undefined) {
        return (
            <div>
                <div>
                    {startDate.getMonth() + 1}/{startDate.getDate()}
                </div>
            </div>
        );
    }
    return (
        <div>
            <div>
                {startDate.getMonth() + 1}/{startDate.getDate()}
            </div>
            <div>to</div>
            <div>
                {endDate.getMonth() + 1}/{endDate.getDate()}
            </div>
        </div>
    );
};

export default DateDisplay;
