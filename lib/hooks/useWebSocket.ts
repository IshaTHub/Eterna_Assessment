import { useEffect, useRef, useCallback } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { updateToken } from "../slices/tokenSlice";
import { Token, TokenColumn } from "../types";

interface WebSocketMessage {
  column: TokenColumn;
  tokenId: string;
  price: number;
  priceChange: number;
  volume: number;
  marketCap: number;
}

export function useWebSocket() {
  const dispatch = useAppDispatch();
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        const mockToken: Token = {
          id: data.tokenId,
          name: "",
          symbol: "",
          icon: "",
          volume: data.volume,
          marketCap: data.marketCap,
          fees: 0,
          transactions: 0,
          timeAgo: "",
          participants: 0,
          votes: 0,
          progress: "",
          percentages: [],
          address: "",
          price: data.price,
          priceChange: data.priceChange,
        };
        dispatch(updateToken({ column: data.column, token: mockToken }));
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    };

    ws.onerror = () => {
      console.warn("WebSocket connection error (using mock)");
    };

    ws.onclose = () => {
      setTimeout(connect, 3000);
    };
  }, [dispatch]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  return wsRef.current;
}
