import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useMatchWebSocket = (matchId, status) => {
    const queryClient = useQueryClient();
    const ws = useRef(null);

    useEffect(() => {
        // Only connect if the match is specifically LIVE
        if (status !== 'live') {
            return;
        }

        const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';
        // Construct specific endpoint: e.g., ws://.../match/{id}
        // Adjust this path based on your actual backend requirement
        const socketUrl = `${wsUrl}/match/${matchId}`;

        console.log(`🔌 Connecting to WebSocket: ${socketUrl}`);
        ws.current = new WebSocket(socketUrl);

        ws.current.onopen = () => {
            console.log('✅ WebSocket Connected');
        };

        ws.current.onmessage = (event) => {
            try {
                const updateData = JSON.parse(event.data);
                console.log('⚡ WS Update:', updateData);

                // Optimistically update the React Query cache
                queryClient.setQueryData(['match', matchId], (oldData) => {
                    if (!oldData) return updateData;

                    // Merge logic: ensure we don't overwrite with nulls if partial updates are sent
                    // Assuming the backend sends the FULL match object or partials. 
                    // This spreads new data over old data.
                    return {
                        ...oldData,
                        ...updateData,
                        // Deep merge specific fields if necessary (like statistics)
                        statistics: {
                            ...oldData.statistics,
                            ...(updateData.statistics || {}),
                        }
                    };
                });
            } catch (error) {
                console.error('❌ Error parsing WS message:', error);
            }
        };

        ws.current.onerror = (error) => {
            console.error('❌ WebSocket Error:', error);
        };

        ws.current.onclose = () => {
            console.log('⚠️ WebSocket Disconnected');
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [matchId, status, queryClient]);
};
