import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe("Counter.vue Component", () => {
  const header = "new message";
  const start = 15;
  const wrapper = shallowMount(Counter, {
    props: { header, start },
  });
  test("renders props when passed", () => {
    expect(wrapper.text()).toMatch(header);
  });
  it("renders props when passed", () => {
    expect(wrapper.exists(start));
  });
});
