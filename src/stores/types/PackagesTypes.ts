interface PackageItem {
  verbose_name: string; // Чат
  price: number; // 1499
  services: [
      {
          service_id: number;
          verbose_name: string; // "Общение с психологом в форме чата (60)",
          quantity: number;
      }
  ];
  period: {
      value: number;
      type: string ;
  };
  alias: string;
}

interface MyPackageItems {
  verbose_name: string;
  dt_end: string;
  services: [
    {
      verbose_name: string;
      quantity: number;
      initial_quantity: number;
    }
  ];
}

export type SelectedPackage = {
  title: string; // Чат
  price: number; // 1499
  alias: string;
  showOrderDialog: boolean;
}

export type BuyPackagesItems = {
  alias: string;
}

export type promoData = {
  alias: string;
  price: string;
}

export type PackageState = {
  packages: PackageItem[];
  myActivePackages: MyPackageItems[];
  myInactivePackages: MyPackageItems[];
  selectedPackage: SelectedPackage | null;
  showOrderDialog: boolean;
  buyPackages: BuyPackagesItems[];
  promoData: promoData;
  token: string;
}
