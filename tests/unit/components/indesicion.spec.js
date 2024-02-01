import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";

describe("Indesicion component", () => {
  let wrapper;
  let clgSpy;
  let makeQuestion;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          image: "https://yesno.wtf/assets/yes/2.gif",
          answer: "yes",
          forced: false,
        }),
    })
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    clgSpy = jest.spyOn(console, "log");
    makeQuestion = jest.spyOn(wrapper.vm, "makeQuestion");
    jest.clearAllMocks();
  });

  test("should match with snapshop", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("should write in input & dont fire any action", async () => {
    const input = wrapper.find("input");
    await input.setValue("Hi World");
    expect(clgSpy).toHaveBeenCalledTimes(1);
    expect(makeQuestion).not.toHaveBeenCalled();
  });
  test("should fire fetch when question sign is writed", async () => {
    const input = wrapper.find("input");
    await input.setValue("Hi World?");
    expect(makeQuestion).toHaveBeenCalledTimes(1);
  });
  test("test on makeQuestion", async () => {
    await wrapper.vm.makeQuestion();
    const img = wrapper.find("img");
    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.url).toBe("https://yesno.wtf/assets/yes/2.gif");
    expect(wrapper.vm.answer).toBe("yes");
  });
  test("should fail makeQuestion", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API down"));
    await wrapper.vm.makeQuestion();
    const img = wrapper.find("img");

    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe("Cannot connect to API");
  });
});
