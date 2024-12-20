"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      const response = await fetch('/api/logout', {
        method: 'GET',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Failed to logout');
      }
    };

    logout();
  }, [router]);

  return <div></div>;
}