import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SceneLight } from "@/components/site-motion";

vi.mock("@tanstack/react-router", () => ({ useRouterState: () => "/", useRouter: () => ({}) }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

function setup(enabled: boolean) {
  vi.spyOn(window, "matchMedia").mockReturnValue({ matches: enabled, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList);
  vi.spyOn(window, "getComputedStyle").mockImplementation((element) => ({ backgroundColor: element.getAttribute("data-surface") === "light" ? "rgb(245, 245, 245)" : "rgb(24, 24, 24)" }) as CSSStyleDeclaration);
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { callback(0); return 1; });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  const result = render(<><SceneLight /><main><section data-surface="dark"><p>Escuro</p><img src="/photo.jpg" alt="Foto" /></section><section data-surface="light"><p>Claro</p></section></main></>);
  return result.container;
}

function move(element: Element) {
  const event = new MouseEvent("pointermove", { bubbles: true, clientX: 120, clientY: 90 });
  Object.defineProperty(event, "pointerType", { value: "mouse" });
  fireEvent(element, event);
}

describe("Scene light boundaries", () => {
  it("follows the mouse on dark surfaces and clears over photos and light surfaces", () => {
    const container = setup(true);
    const sections = container.querySelectorAll("section");
    const dark = sections[0];
    const light = sections[1];
    const text = dark?.querySelector("p");
    const photo = dark?.querySelector("img");
    if (!dark || !light || !text || !photo) throw new Error("Missing test sections");
    // The photo is nested here, unlike a full-bleed section cover.
    const wrapper = document.createElement("div");
    dark.append(wrapper); wrapper.append(photo);
    move(text);
    expect(dark).toHaveAttribute("data-scene-light", "active");
    expect(dark.style.getPropertyValue("--scene-x")).toBe("120px");
    move(photo);
    expect(dark).not.toHaveAttribute("data-scene-light");
    move(text); move(light);
    expect(light).not.toHaveAttribute("data-scene-light");
    expect(dark).not.toHaveAttribute("data-scene-light");
  });
  it("does not activate for touch or reduced-motion settings", () => {
    const container = setup(false);
    const section = container.querySelector("section");
    if (!section) throw new Error("Missing test section");
    move(section);
    expect(section).not.toHaveAttribute("data-scene-light");
  });
});