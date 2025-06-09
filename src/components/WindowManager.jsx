import { MacWindow } from "./MacWindow";

export function WindowManager({ apps, openApps, closeApp, minimizeApp }) {
  const openWindows = apps.filter((app) => openApps[app.id]?.open);

  const visibleWindows = apps.filter(
    (app) => openApps[app.id]?.open && openApps[app.id]?.visible,
  );

  const isSingleVisible = visibleWindows.length === 1;

  return (
    <main
      className={`relative z-10 mt-[-25px] p-6 ${
        isSingleVisible
          ? "flex flex-col items-center justify-center"
          : "grid gap-4 md:grid-cols-2"
      }`}
    >
      {openWindows.map((app) => {
        const isMaximized = openApps[app.id]?.maximized;
        const Component = app.component;

        return (
          <MacWindow
            key={app.id}
            title={app.name}
            visible={openApps[app.id]?.visible}
            maximized={isMaximized}
            onClose={() => closeApp(app.id)}
            onMinimize={() => minimizeApp(app.id)}
          >
            <Component />
          </MacWindow>
        );
      })}
    </main>
  );
}
