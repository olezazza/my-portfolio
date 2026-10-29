import { describe, expect, it } from "vitest";
import { contactLinks, images, profile, projects } from "@/data";

describe("User-confirmed portfolio facts", () => {
  it("publishes the supplied phone number as a dialable contact", () => {
    expect(profile.phone).toBe("+995 574 0322 00");
    expect(contactLinks.find((l) => l.name === "Phone")?.href).toBe("tel:+995574032200");
  });
  it("publishes the supplied email as an email contact", () => {
    expect(contactLinks.find((l) => l.name === "Email")?.href).toBe("mailto:guluadachi@gmail.com");
  });
  it("assigns the second hardware photo to Smart Pill Dispenser", () => {
    expect(projects.find((p) => p.slug === "pill-dispenser")?.photos?.map((p) => p.src)).toEqual([images.concept]);
  });
  it("assigns the green prototype to Anti-Tremor", () => {
    expect(projects.find((p) => p.slug === "anti-tremor")?.photos?.map((p) => p.src)).toEqual([images.prototype]);
  });
  it("assigns the first uploaded logo to DARGE", () => {
    expect(projects.find((p) => p.slug === "darge")?.photos?.[0]?.src).toBe(images.dargeLogo);
  });
  it("assigns the second uploaded logo to Black Lion", () => {
    expect(projects.find((p) => p.slug === "black-lion")?.photos?.[0]?.src).toBe(images.blackLionLogo);
  });
});