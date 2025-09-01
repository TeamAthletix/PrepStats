export type Role = 'ATHLETE' | 'COACH' | 'PARENT' | 'MEDIA' | 'ORG' | 'ADMIN';

export const rolePermissions: Record<Role, string[]> = {
  ATHLETE: ['read_stats', 'upload_stats', 'view_awards'],
  COACH: ['verify_stats', 'assign_awards', 'manage_team'],
  PARENT: ['view_stats', 'view_awards'],
  MEDIA: ['view_leaderboards', 'upload_media'],
  ORG: ['manage_users', 'view_all_stats'],
  ADMIN: ['all'],
};

export function hasPermission(role: Role, permission: string): boolean {
  if (role === 'ADMIN') return true;
  return rolePermissions[role]?.includes(permission) ?? false;
}