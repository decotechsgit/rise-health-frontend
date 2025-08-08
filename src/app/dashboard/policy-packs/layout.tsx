export default function FormsModulesLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto">{children}</div>
      {modal}
    </div>
  );
}
