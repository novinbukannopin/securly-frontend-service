'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface ReactQueryProviderProps {
	children: React.ReactNode;
}

const queryClient = new QueryClient({});

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default ReactQueryProvider;