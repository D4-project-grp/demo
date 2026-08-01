package com.bookmyvenue.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
	private final JwtUtils jwtUtils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		try {
			/*
			 * 1. Check if Authorization (request) header exists in incoming request
			 */
			String authHeader = request.getHeader("Authorization");
			/*
			 * 2. If it's not null & starts with Bearer
			 */
			if (authHeader != null && authHeader.startsWith("Bearer ")) {
				/*
				 * 3. Extract & validate token
				 */
				String jwt = authHeader.substring(7);
				log.info("*********** JWT {}",jwt);
				Claims payload = jwtUtils.verifyJwtAndExtractClaims(jwt);
				/*
				 * Using custom claims in the payload , create Authentication object
				 */
				Long userId = payload.get("user_id", Long.class);
				String roleName = payload.get("user_role", String.class);
				UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userId, null,
						List.of(new SimpleGrantedAuthority(roleName)));
				/*
				 * Store auth object under spring sec ctx holder
				 */
				SecurityContextHolder.getContext().setAuthentication(token);
				// continue with remaining filter chain

			}

			filterChain.doFilter(request, response);
		} catch (Exception e) {


			// => JWT validation failure -> clear spring sec ctx holder
			SecurityContextHolder.clearContext();
			// -> send SC 401 + mesg
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);// SC 401
			response.getWriter().print("Invalid JWT - Auth Failed !!!!!!");
			return;
		}

	}

}
