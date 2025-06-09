import { MacWindow } from "./MacWindow";

export function WindowManager({
  apps,
  openApps,
  closeApp,
  minimizeApp,
  toggleMaximize,
}) {
  const visibleWindows = apps.filter(
    (app) => openApps[app.id]?.open && openApps[app.id]?.visible
  );

  return (
    <main className={`relative z-10 grid gap-4 p-6 md:grid-cols-2`}>
      {visibleWindows.map((app) => {
        const isMaximized = openApps[app.id]?.maximized;
        const Component = app.component;

        return (
          <MacWindow
            key={app.id}
            title={app.name}
            visible={true}
            maximized={isMaximized}
            onClose={() => closeApp(app.id)}
            onMinimize={() => minimizeApp(app.id)}
            onMaximize={() => toggleMaximize(app.id)}
          >
            <Component />
          </MacWindow>
        );
      })}
    </main>
  );
}
