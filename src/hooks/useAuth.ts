/**
 * 认证相关钩子
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";

/**
 * 认证钩子，提供认证相关功能
 */
export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    fetchCurrentUser,
    resetError,
  } = useAuthStore();

  // 组件挂载时检查用户认证状态
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      fetchCurrentUser();
    }
  }, [isAuthenticated, isLoading, fetchCurrentUser]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    resetError,
  };
};

/**
 * 受保护路由钩子，用于保护需要认证的路由
 * @param redirectTo 未认证时重定向的路径
 */
export const useProtectedRoute = (redirectTo: string = "/login") => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  return { isAuthenticated, isLoading };
};

/**
 * 角色保护钩子，用于保护需要特定角色的路由
 * @param allowedRoles 允许访问的角色数组
 * @param redirectTo 未授权时重定向的路径
 */
export const useRoleProtected = (
  allowedRoles: string[],
  redirectTo: string = "/unauthorized"
) => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (!allowedRoles.includes(user.role)) {
        navigate(redirectTo, { replace: true });
      }
    } else if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [user, isAuthenticated, isLoading, allowedRoles, navigate, redirectTo]);

  return {
    user,
    isAuthenticated,
    isLoading,
    hasPermission: user && allowedRoles.includes(user.role),
  };
};
