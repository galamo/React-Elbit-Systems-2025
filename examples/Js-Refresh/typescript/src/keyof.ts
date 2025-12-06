type ScanResult = {
  numberOfVulnerabilities: number;
  packages: Array<{ name: string; version: string; cve: string }>;
  priorities: Array<string>;
  id: string;
  userScannerId: string;
  isHandled?: boolean;
};
const scanErrors: Array<ScanResult> = [
  {
    numberOfVulnerabilities: 1,
    packages: [{ name: "fetch", version: "1.2.3", cve: "2024-1554-223" }],
    priorities: ["high", "low"],
    id: "id_1",
    userScannerId: "2024_12_12",
  },
  {
    numberOfVulnerabilities: 1,
    packages: [{ name: "axios", version: "1.2.3", cve: "2024-1124-223" }],
    priorities: ["high", "low"],
    id: "id_2",
    userScannerId: "2024_12_12",
  },
];

type ScanResultKey = keyof Omit<ScanResult, "priorities" | "packages">;

searchScan(scanErrors, "isHandled", true);
function searchScan(
  data: Array<ScanResult>,
  key: ScanResultKey,
  value: string | number | boolean
): Array<ScanResult> | undefined {
  if (!Array.isArray(data)) return;
  return data.filter((singleItem: ScanResult) => {
    if (typeof value === "number") {
      return singleItem[key] === value;
    } else if (typeof value === "boolean") {
      console.log(value);
    } else {
      return (singleItem[key] as string).toLowerCase() === value.toLowerCase();
    }
  });
}
searchScan(scanErrors, "userScannerId", "aa");

type KeyValue<K extends ScanResultKey> = ScanResult[K];

function searchScan2<K extends ScanResultKey>(
  data: Array<ScanResult>,
  key: K,
  value: KeyValue<K>
): Array<ScanResult> {
  return data.filter((item) => {
    const itemValue = item[key];

    if (typeof value === "string" && typeof itemValue === "string") {
      return itemValue.toLowerCase() === value.toLowerCase();
    }

    return itemValue === value;
  });
}
