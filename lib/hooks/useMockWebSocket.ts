import { useEffect, useRef, useCallback } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { updateToken, reorderTokens } from "../slices/tokenSlice";
import { TokenColumn } from "../types";

interface TokenUpdate {
  column: TokenColumn;
  tokenId: string;
  price?: number;
  priceChange?: number;
  volume?: number;
  marketCap?: number;
  fees?: number;
  transactions?: number;
  timeAgo?: string;
  participants?: number;
  votes?: number;
  percentages?: Array<{ value: number; timeframe?: string }>;
}

export function useMockWebSocket() {
  const dispatch = useAppDispatch();
  const intervalRefs = useRef<{
    general?: NodeJS.Timeout;
    timeAgo?: NodeJS.Timeout;
    mcTx?: NodeJS.Timeout;
    reorder?: NodeJS.Timeout;
  }>({});
  const columns = useAppSelector((state) => state.tokens.columns);
  const columnsRef = useRef(columns);

  // Keep ref in sync with columns
  useEffect(() => {
    columnsRef.current = columns;
  }, [columns]);

  const generateTimeAgo = useCallback((): string => {
    const seconds = Math.floor(Math.random() * 60);
    if (seconds < 10) return `${seconds}s`;
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  }, []);

  const getRandomToken = useCallback((): {
    column: TokenColumn;
    tokenId: string;
    token: any;
  } | null => {
    const columnTypes: TokenColumn[] = ["newPairs", "finalStretch", "migrated"];
    const column = columnTypes[Math.floor(Math.random() * columnTypes.length)];
    const availableTokens = columnsRef.current[column];
    if (!availableTokens || availableTokens.length === 0) return null;
    const randomToken =
      availableTokens[Math.floor(Math.random() * availableTokens.length)];
    return { column, tokenId: randomToken.id, token: randomToken };
  }, []);

  useEffect(() => {
    // Update timeAgo every 2 seconds
    const updateTimeAgo = () => {
      const tokenData = getRandomToken();
      if (tokenData) {
        dispatch(
          updateToken({
            column: tokenData.column,
            token: {
              id: tokenData.tokenId,
              timeAgo: generateTimeAgo(),
            },
          })
        );
      }
    };

    // Update MC and TX every 5 seconds (slowly)
    const updateMcTx = () => {
      const tokenData = getRandomToken();
      if (tokenData) {
        const { token } = tokenData;
        const currentPrice = token.price || 0.0001;
        const priceChange = (Math.random() - 0.45) * 5; // Smaller changes for slower updates
        const newPrice = Math.max(
          0.00001,
          currentPrice * (1 + priceChange / 100)
        );
        const marketCapChange = (newPrice / currentPrice - 1) * token.marketCap;
        const newMarketCap = Math.max(100, token.marketCap + marketCapChange);
        const txChange = Math.floor(Math.random() * 2); // Smaller changes
        const newTransactions = Math.max(
          0,
          token.transactions + (Math.random() > 0.5 ? txChange : -txChange)
        );

        dispatch(
          updateToken({
            column: tokenData.column,
            token: {
              id: tokenData.tokenId,
              marketCap: newMarketCap,
              transactions: newTransactions,
            },
          })
        );
      }
    };

    // Reorder tokens in all columns every 1-2 seconds
    const reorderColumnTokens = () => {
      const columnTypes: TokenColumn[] = [
        "newPairs",
        "finalStretch",
        "migrated",
      ];
      // Reorder all columns
      columnTypes.forEach((column) => {
        const availableTokens = columnsRef.current[column];
        if (availableTokens && availableTokens.length > 1) {
          dispatch(reorderTokens({ column }));
        }
      });
    };

    // Update other fields every 3-4 seconds
    const updateGeneral = () => {
      const tokenData = getRandomToken();
      if (tokenData) {
        const { token } = tokenData;
        const priceChange = (Math.random() - 0.45) * 15;
        const currentPrice = token.price || 0.0001;
        const newPrice = Math.max(
          0.00001,
          currentPrice * (1 + priceChange / 100)
        );
        const volumeChange = (Math.random() * 0.3 + 0.05) * token.volume;
        const newVolume = Math.max(
          0,
          token.volume + volumeChange * (Math.random() > 0.3 ? 1 : -1)
        );
        const feesChange = Math.random() * 0.2 * token.fees;
        const newFees = Math.max(0, token.fees + feesChange);
        const newParticipants =
          Math.random() > 0.7
            ? Math.max(0, token.participants + (Math.random() > 0.5 ? 1 : -1))
            : token.participants;
        const newVotes =
          Math.random() > 0.8
            ? Math.max(0, token.votes + (Math.random() > 0.5 ? 1 : -1))
            : token.votes;
        const newPercentages = token.percentages.map((p: any) => ({
          value: Math.max(
            -100,
            Math.min(100, p.value + (Math.random() - 0.5) * 2)
          ),
          timeframe: p.timeframe,
        }));

        dispatch(
          updateToken({
            column: tokenData.column,
            token: {
              id: tokenData.tokenId,
              price: newPrice,
              priceChange,
              volume: newVolume,
              fees: newFees,
              participants: newParticipants,
              votes: newVotes,
              percentages: newPercentages,
            },
          })
        );
      }
    };

    // Start all intervals
    updateTimeAgo();
    updateMcTx();
    updateGeneral();
    reorderColumnTokens();

    intervalRefs.current.timeAgo = setInterval(updateTimeAgo, 2000);
    intervalRefs.current.mcTx = setInterval(updateMcTx, 5000);
    intervalRefs.current.general = setInterval(
      updateGeneral,
      3000 + Math.random() * 1000
    );
    intervalRefs.current.reorder = setInterval(
      reorderColumnTokens,
      1000 + Math.random() * 1000
    );

    return () => {
      if (intervalRefs.current.timeAgo)
        clearInterval(intervalRefs.current.timeAgo);
      if (intervalRefs.current.mcTx) clearInterval(intervalRefs.current.mcTx);
      if (intervalRefs.current.general)
        clearInterval(intervalRefs.current.general);
      if (intervalRefs.current.reorder)
        clearInterval(intervalRefs.current.reorder);
    };
  }, [dispatch, getRandomToken, generateTimeAgo]);
}
