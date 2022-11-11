import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { server } from "../../../../../jest.setup";
import { getInProgressInvoice, getCompletedInvoice } from "../fixtures";
import InvoicePage from "../../invoicePage";

const mockGetInvoice = (returnFn) => {
  server.use(rest.get("http://invoices", returnFn));
};

describe("InvoicePage", () => {
  it("shows loading on load", async () => {
    mockGetInvoice((req, res, ctx) => {
      return res(ctx.delay("infinite"));
    });

    render(<InvoicePage />);
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
  });

  it("shows headers of invoice status types", async () => {
    mockGetInvoice((req, res, ctx) => {
      return res(ctx.json([]));
    });

    render(<InvoicePage />);

    let text = await screen.findByText("Completed");
    expect(text).toBeInTheDocument();
    expect(text).toBeInstanceOf(HTMLHeadingElement);

    text = await screen.findByText("In Progress");
    expect(text).toBeInTheDocument();
    expect(text).toBeInstanceOf(HTMLHeadingElement);
  });

  it("shows each invoice card when two cards retrieved", async () => {
    mockGetInvoice((req, res, ctx) => {
      const inProgress = getInProgressInvoice();
      const completed = getCompletedInvoice();

      return res(ctx.json([inProgress, completed]));
    });

    render(<InvoicePage />);

    const cards = await screen.findAllByTestId("invoice-card");
    expect(cards).toHaveLength(2);
  });
});
