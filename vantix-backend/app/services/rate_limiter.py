import time
from fastapi import Request, HTTPException

# Simple thread-safe rate limiter dictionary mapping IP to timestamps
ip_requests = {}

def rate_limit(request: Request):
    # Retrieve client IP host from request parameters
    client_ip = request.client.host if request.client else "127.0.0.1"
    current_time = time.time()
    
    # Prune request history older than 60 seconds
    if client_ip in ip_requests:
        ip_requests[client_ip] = [t for t in ip_requests[client_ip] if current_time - t < 60]
    else:
        ip_requests[client_ip] = []
        
    if len(ip_requests[client_ip]) >= 15:  # Rate limit set at 15 requests per minute
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded: Maximum 15 requests per minute allowed."
        )
        
    ip_requests[client_ip].append(current_time)
