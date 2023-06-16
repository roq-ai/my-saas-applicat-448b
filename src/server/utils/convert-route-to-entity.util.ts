const mapping: Record<string, string> = {
  clients: 'client',
  organizations: 'organization',
  users: 'user',
  'workout-plans': 'workout_plan',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
