import { expect } from "chai";
import { Given, When, Then } from "./test-utils.js";
import { parseRawLinks, resolveUrls } from "@/link-utils.js";


Given("a raw link header value", () => {
  const rawLink = "</foo>; rel=\"foo\"; title=\"Foo\"";
  const link = [{
    href: "/foo",
    rel: "foo",
    title: "Foo"
  }];

  const rawLinks =
    "</a>; rel=\"a\"; title=\"Link A\", " +
    "</b>; rel=\"b\"; title=\"Link B\"";
  const links = [{
    href: "/a",
    rel: "a",
    title: "Link A"
  }, {
    href: "/b",
    rel: "b",
    title: "Link B"
  }];

  When("a single link is parsed", () => {
    Then("it should return the correct link", () => {
      expect(parseRawLinks(rawLink)).to.eql(link);
    });
  });

  When("multiple links are parsed", () => {
    Then("it should return the correct links", () => {
      expect(parseRawLinks(rawLinks)).to.eql(links);
    });
  });

  When("the value is null", () => {
    Then("it should set the links to an empty array", () => {
      expect(parseRawLinks(null)).to.eql([]);
    });
  });

  When("the value is an empty array", () => {
    Then("it should set the links to an empty array", () => {
      expect(parseRawLinks([])).to.eql([]);
    });
  });
});

Given("an array of links", () => {
  const baseUrl = "http://test.com";

  const link = [{
    href: "/foo",
    rel: "foo",
    title: "Foo"
  }];
  const resolvedLink = [{
    href: "#http%3A%2F%2Ftest.com%2Ffoo",
    rel: "foo",
    title: "Foo"
  }];

  const links = [{
    href: "/a",
    rel: "a",
    title: "Link A"
  }, {
    href: "/b",
    rel: "b",
    title: "Link B"
  }];
  const resolvedLinks = [{
    href: "#http%3A%2F%2Ftest.com%2Fa",
    rel: "a",
    title: "Link A"
  }, {
    href: "#http%3A%2F%2Ftest.com%2Fb",
    rel: "b",
    title: "Link B"
  }];

  When("the array has 1 link", () => {
    Then("it should resolve the link correctly", () => {
      expect(resolveUrls(link, baseUrl)).to.eql(resolvedLink);
    });
  });

  When("the array has multiple links", () => {
    Then("it should resolve the links correctly", () => {
      expect(resolveUrls(links, baseUrl)).to.eql(resolvedLinks);
    });
  });
});
