/**
 * Configuration for different user tiers:
 * - Casual: Dashboard-based configuration only
 * - Power: Environment variables + API configuration
 * - Enterprise: Self-hosted with full control
 */

export enum UserTier {
  CASUAL = 'casual',
  POWER = 'power',
  ENTERPRISE = 'enterprise',
}

export interface TierConfig {
  tier: UserTier;
  features: {
    dashboardConfig: boolean;
    envConfig: boolean;
    apiConfig: boolean;
    selfHosted: boolean;
    customDomain: boolean;
    advancedRBAC: boolean;
  };
  limits: {
    maxProjects: number;
    maxApiKeys: number;
    maxUsers: number;
    rateLimit: number;
  };
}

export const tierConfigs: Record<UserTier, TierConfig> = {
  [UserTier.CASUAL]: {
    tier: UserTier.CASUAL,
    features: {
      dashboardConfig: true,
      envConfig: false,
      apiConfig: false,
      selfHosted: false,
      customDomain: false,
      advancedRBAC: false,
    },
    limits: {
      maxProjects: 3,
      maxApiKeys: 5,
      maxUsers: 10,
      rateLimit: 100,
    },
  },
  [UserTier.POWER]: {
    tier: UserTier.POWER,
    features: {
      dashboardConfig: true,
      envConfig: true,
      apiConfig: true,
      selfHosted: false,
      customDomain: true,
      advancedRBAC: true,
    },
    limits: {
      maxProjects: 10,
      maxApiKeys: 20,
      maxUsers: 100,
      rateLimit: 1000,
    },
  },
  [UserTier.ENTERPRISE]: {
    tier: UserTier.ENTERPRISE,
    features: {
      dashboardConfig: true,
      envConfig: true,
      apiConfig: true,
      selfHosted: true,
      customDomain: true,
      advancedRBAC: true,
    },
    limits: {
      maxProjects: -1, // unlimited
      maxApiKeys: -1,
      maxUsers: -1,
      rateLimit: -1,
    },
  },
};
