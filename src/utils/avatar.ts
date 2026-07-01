export const AVATAR_COLORS = [
  { bg: '#3182CE', text: '#FFFFFF' }, // Blue
  { bg: '#805AD5', text: '#FFFFFF' }, // Purple
  { bg: '#319795', text: '#FFFFFF' }, // Teal
  { bg: '#D69E2E', text: '#FFFFFF' }, // Amber
  { bg: '#E53E3E', text: '#FFFFFF' }, // Red
  { bg: '#38A169', text: '#FFFFFF' }, // Green
  { bg: '#DD6B20', text: '#FFFFFF' }, // Orange
  { bg: '#4A5568', text: '#FFFFFF' }, // Cool Gray
];

export const getAvatarStyle = (name: string) => {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

export const getInitials = (name: string) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
