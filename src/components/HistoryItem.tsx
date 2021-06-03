import { FC } from 'react';
import { LocalizationResponse } from '../services/ipStack';

interface HistoryItemProps {
    historyItem: LocalizationResponse;
    onHistoryHandler: (ip: string) => void;
}

export const HistoryItem: FC<HistoryItemProps> = ({
    historyItem,
    onHistoryHandler,
}) => (
    <div
        className='history-item'
        onClick={() => onHistoryHandler(historyItem.ip)}>{historyItem.ip}
    </div>
)