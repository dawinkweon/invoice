import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "components/Home";
import { rest } from "msw";
import { server } from "../../jest.setup";
import { getInProgressInvoice, getCompletedInvoice } from "../helpers/fixtures";

describe("Home", () => {
  it("shows loading on load", async () => {
    server.use(
      rest.get("http://invoices", (req, res, ctx) => {
        return res(ctx.delay("infinite"));
      })
    );

    render(<Home />);
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
  });

  it("shows headers of invoice status types", async () => {
    server.use(
      rest.get("http://invoices", (req, res, ctx) => {
        return res(ctx.json([]));
      })
    );

    render(<Home />);

    let text = await screen.findByText("Completed");
    expect(text).toBeInTheDocument();
    expect(text).toBeInstanceOf(HTMLHeadingElement);

    text = await screen.findByText("In Progress");
    expect(text).toBeInTheDocument();
    expect(text).toBeInstanceOf(HTMLHeadingElement);
  });

  it("shows each invoice card when two cards retrieved", async () => {
    server.use(
      rest.get("http://invoices", (req, res, ctx) => {
        const inProgress = getInProgressInvoice();
        const completed = getCompletedInvoice();

        return res(ctx.json([inProgress, completed]));
      })
    );

    render(<Home />);

    const cards = await screen.findAllByTestId("invoice-card")
    expect(cards).toHaveLength(2);
  });
});
