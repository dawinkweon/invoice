export default function handler(req, res) {
  return res.status(200).json([
    {
      id: 1,
      customer: {
        name: "Earl Construction Ltd.",
        address: "197 Sunnynook Road",
      },
      createdDate: "2022-11-02",
    },
    {
      id: 2,
      customer: {
        name: "DK Projects Ltd.",
        address: "181 Upper Harbour Drive",
      },
      createdDate: "2022-11-02",
    },
  ]);
}
