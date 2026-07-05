import cors from 'cors';
/**
 * Creates a CORS middleware configured from the ALLOWED_ORIGINS environment variable.
 * Falls back to allowing localhost:5173 in development.
 */
export declare function createCorsMiddleware(): (req: cors.CorsRequest, res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void;
//# sourceMappingURL=cors.d.ts.map