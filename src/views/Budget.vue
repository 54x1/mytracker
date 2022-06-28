<template>
    <div>
      {{calcBudget(10)}}
    <ds-form-singleselect name="fruit" v-model="period" :options="options" />
    </div>
</template>

<script>

import {
  DsFormSingleselect,
} from "@au-gov/pcms-design-system-vue";
import { ref } from "@vue/composition-api";

export default {
    setup() {
        const options = [
            { text: "Daily", value: "1" },
            { text: "Weekly", value: "7" },
            { text: "Forntightly", value: "14" },
            { text: "Monthly", value: "30" },
            { text: "Yearly", value: "365" },
        ];

        const calcBudget = (money) => {
            return period.value * money;
        }

        const period = ref(options[0]);
        return {
            period,
            options,
            calcBudget,
        };
    },
    components: {
        DsFormSingleselect
    }
};
</script>
