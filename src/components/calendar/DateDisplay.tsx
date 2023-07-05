export interface DateDisplayProps {
    startDate: Date;
    endDate: Date;
}

const DateDisplay = ({ startDate, endDate }: DateDisplayProps) => {
    if (startDate.getTime() == endDate.getTime()) {
        return (
            <div>
                <div>
                    {startDate.getMonth() + 1}/{startDate.getDate()}
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-wrap">
            <span>
                {startDate.getMonth() + 1}/{startDate.getDate()}
            </span>
            <span className="mx-1">to</span>
            <span>
                {endDate.getMonth() + 1}/{endDate.getDate()}
            </span>
        </div>
    );
};

export default DateDisplay;
