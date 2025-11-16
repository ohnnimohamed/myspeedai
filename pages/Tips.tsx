
import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

const Tips = () => {
  const { t } = useLocalization();
  
  const tips = [
    { title: "Find the Right Spot for Your Router", content: "Place your router in a central, open area of your home, away from walls and obstructions. Avoid placing it near metal objects or electronics that can cause interference, like microwaves." },
    { title: "Update Your Router's Firmware", content: "Router manufacturers regularly release firmware updates to improve performance and security. Check your router manufacturer's website for the latest version." },
    { title: "Secure Your WiFi Network", content: "An unsecured network can be used by neighbors, slowing down your connection. Use a strong WPA2 or WPA3 password to protect your network." },
    { title: "Use a WiFi Extender or Mesh System", content: "If you have a large home, a single router might not be enough. A WiFi extender can boost the signal to dead zones, while a mesh WiFi system provides seamless coverage throughout your home." },
    { title: "Choose the Right WiFi Channel", content: "If you live in a crowded area like an apartment building, your neighbors' WiFi networks can interfere with yours. Use a WiFi analyzer app to find the least crowded channel and switch to it in your router settings." },
    { title: "Reboot Your Router Regularly", content: "Just like a computer, routers can benefit from a periodic reboot. This can clear up memory issues and resolve simple connection problems. A weekly reboot is a good practice." },
    { title: "Use the 5GHz Band", content: "Modern routers are dual-band, offering both 2.4GHz and 5GHz frequencies. The 5GHz band is faster and less congested, making it ideal for streaming and gaming. Use it for devices that are closer to the router." }
  ];

  return (
    <div className="bg-card-light dark:bg-card-dark p-6 md:p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-text-light dark:text-text-dark">{t('tips.title')}</h1>
      <div className="space-y-6">
        {tips.map((tip, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold text-primary dark:text-primary-dark mb-2">{tip.title}</h2>
            <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">{tip.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;
