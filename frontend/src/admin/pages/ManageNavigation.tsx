import AdminCrudPage from "../components/AdminCrudPage";
import { seedNavigation } from "../data/seedContent";

export default function ManageNavigation() {
  return (
    <AdminCrudPage
      title="Navigation Menu"
      description="Manage header menu items shown on the website."
      storageKey="navigation"
      seedData={seedNavigation}
      columns={[
        { key: "label", label: "Label" },
        { key: "link", label: "Link" },
        { key: "order", label: "Order" },
        {
          key: "visible",
          label: "Visible",
          render: (row) => (row.visible ? "Yes" : "No"),
        },
      ]}
      fields={[
        { name: "label", label: "Menu Label" },
        { name: "link", label: "Link URL", placeholder: "/about or /#projects" },
        { name: "order", label: "Display Order", type: "number", defaultValue: "1" },
        { name: "visible", label: "Show in menu", type: "checkbox", defaultValue: true },
      ]}
    />
  );
}
