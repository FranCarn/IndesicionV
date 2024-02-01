import { shallowMount, mount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe("Counter.vue Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter, { props: { start: 100 } });
  });

  afterEach(() => {
    wrapper = null;
  });

  test("should match with snapshop", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("should checking h2 default value", () => {
    expect(wrapper.find("h2").exists()).toBeTruthy();
    const h2 = wrapper.find("h2").text();
    expect(h2).toBe("Counter");
  });
  test("should show default value 100 in paragraph", () => {
    // const p = wrapper.findAll("p");
    // expect(p.length).toBeGreaterThanOrEqual(2);
    // expect(p[0].text()).toBe("100");
    const p = wrapper.find('[data-testid="counter"]').text();
    expect(p).toBe("100");
  });
  it("should increase & decrease value counter", async () => {
    const [decreaseBtn, increaseBtn] = wrapper.findAll("button");
    await decreaseBtn.trigger("click");
    await increaseBtn.trigger("click");
    await increaseBtn.trigger("click");

    const counter = wrapper.find('[data-testid="counter"]').text();
    expect(counter).toBe("101");
  });
  test("should check value in props", () => {
    // const value = wrapper.props('start');
    const { start } = wrapper.props();
    const value = wrapper.find('[data-testid="counter"]').text();
    expect(Number(value)).toBe(start);
  });
  it("should show title prop", () => {
    const props = {
      start: 100,
      header: "Hi world",
    };
    const wrapper = shallowMount(Counter, { props });
    const value = wrapper.find('[data-testid="counter"]').text();
    const text = wrapper.find("h2").text();
    expect(Number(value)).toBe(props.start);
    expect(text).toBe(props.header);
  });
});
