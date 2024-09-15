This tutorial will guide you how to create and work with a new DAO.

1. **Create a DAO Interface:**
   ```
   // Example UserDao.java
   public interface UserDao GenericDaoJpa<T,T>{
       User findById(Long id);
       // other methods...
   }
   ```

2. **DAO implementation:**
   When you define a method in a Spring Data JPA repository interface with a specific name, Spring Data JPA looks for a named query with the same name defined in the JPA entity associated with the repository.
   
   For example, you have a method in the EchantillonDao interface:
   ```java
   List<Echantillon> findByCode(String code);
   ```
   
3. **Configure the DAO Bean in applicationContextDao.xml:**
```xml
<!-- applicationContextDao.xml -->
<beans>
    <!-- Copy From Here-->
    <bean id="!name!" parent="abstractDao">
        <property name="proxyInterfaces">
            <value>!packageName.DaoClassName!</value>
        </property>
        <property name="target">
            <bean parent="abstractDaoTarget">
                <constructor-arg>
                    <value>!packageName.EntityName!</value>
                </constructor-arg>
            </bean>
        </property>
    </bean>
</beans>
```

4. **Inject the DAO to the Service who uses it:**
```xml
<beans>
    <!-- Configure UserService bean -->
    <bean id="userService" class="com.example.service.UserService">
        <property name="userDao" ref="userDao" />
    </bean>
</beans>
```

5. **Write a Test:**
Extend the `AbstractDaoTest` and create setter methods as necessary.

6. **Optional: Include Test in pom.xml:**
```xml
<!-- pom.xml -->
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.0.0-M5</version>
            <configuration>
                <includes>
                    <include>**/UserServiceTest.java</include>
                </includes>
            </configuration>`
        </plugin>`
    </plugins>`
</build>`
```

These steps provide a basic structure for setting up DAOs, Services, and tests in an older Spring project using XML configuration. Adjust package names, file paths, and other details to match your specific project structure.