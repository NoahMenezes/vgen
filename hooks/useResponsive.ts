"use client";

import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'laptop' | 'desktop';

export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  deviceType: DeviceType;
  windowWidth: number;
  windowHeight: number;
  isMounted: boolean;
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    deviceType: 'desktop', // Safe default for Server-Side Rendering
    windowWidth: 0,
    windowHeight: 0,
    isMounted: false,
  });

  useEffect(() => {
    // We only execute this on the client
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Standard responsive breakpoints catering to standard iPhones/Androids & Tablets
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isLaptop = width >= 1024 && width < 1440;
      const isDesktop = width >= 1440;
      
      let deviceType: DeviceType = 'desktop';
      if (isMobile) deviceType = 'mobile';
      else if (isTablet) deviceType = 'tablet';
      else if (isLaptop) deviceType = 'laptop';

      setState({
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        deviceType,
        windowWidth: width,
        windowHeight: height,
        isMounted: true, // Guarantees hydration safety
      });
    };

    // Trigger immediately on mount to grab exact client dimensions
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return state;
}
