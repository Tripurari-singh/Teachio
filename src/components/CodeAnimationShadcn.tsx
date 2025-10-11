'use client';

import {
  Code,
  CodeBlock,
  CodeHeader,
} from '@/components/animate-ui/components/animate/code';
// import ReactIcon from '@/components/icons/react-icon';
import { File } from 'lucide-react';
import ReactIcon from "@/components/Icons/CodeIcon";

interface CodeDemoProps {
  duration: number;
  delay: number;
  writing: boolean;
  cursor: boolean;
}

export const CodeDemo = ({
  duration,
  delay,
  writing,
  cursor,
}: CodeDemoProps) => {
  return (
    <Code
      key={`${duration}-${delay}-${writing}-${cursor}`}
      className="w-[420px] h-[372px] bg-black"
      code={`import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
iris = load_iris()
X, y = iris.data, iris.target 
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42)
print(f"Prediction for new flower: {predicted_species}")
knn.fit(X_train, y_train)
accuracy = knn.score(X_test, y_test)
print(f"Model Accuracy on Test Set: {accuracy:.2f}")
prediction = knn.predict(new_flower)
`}
    >
      <CodeHeader className='bg-black' icon={ReactIcon} copyButton>
      </CodeHeader>

      <CodeBlock className='bg-black'
        cursor={cursor}
        lang="tsx"
        writing={writing}
        duration={duration}
        delay={delay}
        theme='dark'
        />
    </Code>
  );
};



